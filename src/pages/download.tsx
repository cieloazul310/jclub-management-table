import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Box from '@mui/material/Box';
import Layout from '../layout';
import ItemFilter from '../components/download/ItemFilter';
import { DatumBrowser, ClubBrowser, YearBrowser } from '../../types';

type DownloadPageData = {
  allData: {
    edges: {
      node: Omit<DatumBrowser, 'previousData'>;
    }[];
  };
  j1: {
    edges: {
      node: Pick<ClubBrowser, 'name' | 'slug'>;
    }[];
  };
  j2: {
    edges: {
      node: Pick<ClubBrowser, 'name' | 'slug'>;
    }[];
  };
  j3: {
    edges: {
      node: Pick<ClubBrowser, 'name' | 'slug'>;
    }[];
  };
  allYear: {
    edges: {
      node: Pick<YearBrowser, 'year'>;
    }[];
  };
};

function DownloadPage({ data }: PageProps<DownloadPageData>) {
  const { allData, j1, j2, j3, allYear } = data;
  const allCategories = ['J1', 'J2', 'J3', 'others'];
  const slugs = [...j1.edges, ...j2.edges, ...j3.edges].map(({ node }) => node.slug);
  const years = allYear.edges.map(({ node }) => node.year);
  const [clubsFilter, setClubsFilter] = React.useState(slugs);
  const [yearsFilter, setYearsFilter] = React.useState([years[years.length - 1]]);
  const [categoriesFilter, setCategoriesFilter] = React.useState(allCategories);

  const dataset = React.useMemo(() => {
    return allData.edges
      .filter(({ node }) => yearsFilter.includes(node.year))
      .filter(({ node }) => clubsFilter.includes(node.slug))
      .filter(({ node }) => categoriesFilter.includes(node.category));
  }, [allData, clubsFilter, yearsFilter]);

  return (
    <Layout title="データダウンロード">
      <Box display="flex">
        <Box flex={1}>
          <ItemFilter
            clubs={{ j1, j2, j3 }}
            clubsFilter={clubsFilter}
            yearsFilter={yearsFilter}
            categoriesFilter={categoriesFilter}
            setClubsFilter={setClubsFilter}
            setYearsFilter={setYearsFilter}
            setCategoriesFilter={setCategoriesFilter}
          />
        </Box>
        <Box flex={1} />
      </Box>
    </Layout>
  );
}
export default DownloadPage;
/*
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Layout from '../layout';
import ItemFilter from '../components/download/ItemFilter';
import FieldFilter from '../components/download/FieldFilter';
import Preview from '../components/download/Preview';
import allFields from '../components/download/fields';
import TabPane from '../components/download/TabPane';
import { ContentBasisLarge } from '../components/Basis';
import { AdInArticle } from '../components/Ads';
import useIsMobile from '../utils/useIsMobile';
import { useAllClubs, useDictionary } from '../utils/graphql-hooks';
import { DownloadDataset } from '../types';
import { DownloadQuery } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.only('xs')]: {
        display: 'block',
      },
    },
    tabPane: {
      width: '50%',
      height: 'calc(100vh - 64px)',
      overflowY: 'auto',
      [theme.breakpoints.only('xs')]: {
        width: '100%',
        height: 'calc(100vh - 56px)',
      },
    },
  })
);

function getCategory(category: string | null | undefined) {
  return category === 'J1' || category === 'J2' || category === 'J3' ? category : 'others';
}

function DownloadPage({ data }: PageProps<DownloadQuery>): JSX.Element {
  const { allDataset } = data;
  const classes = useStyles();
  const isMobile = useIsMobile();
  const dict = useDictionary();
  const allClubs = useAllClubs().map(({ node }) => node.slug ?? '');
  const allCategories = React.useMemo(() => ['J1', 'J2', 'J3', 'others'], []);

  const [tab, setTab] = React.useState(0);
  const [clubsFilter, setClubsFilter] = React.useState(allClubs);
  const [yearsFilter, setYearsFilter] = React.useState([2019]);
  const [categoriesFilter, setCategoriesFilter] = React.useState(allCategories);
  const [fields, setFields] = React.useState<string[]>(allFields);
  const handleTabChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTab(value);
  };
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };
  React.useEffect(() => {
    if (!isMobile && tab === 2) {
      setTab(0);
    }
  }, [isMobile, tab]);
  const dataset = React.useMemo(
    () =>
      allDataset.edges
        .map(({ node }) => node)
        .filter(({ slug }) => clubsFilter.includes(slug ?? ''))
        .filter(({ year }) => yearsFilter.includes(year ?? 0))
        .filter(({ category }) => categoriesFilter.includes(getCategory(category)))
        .map((datum) => {
          const obj: DownloadDataset = {
            クラブ: datum.name ?? '',
            年: datum.year ?? 0,
            所属: datum.category ?? '',
            id: datum.slug ?? '',
          };
          const selectedFields = allFields.filter((field) => fields.includes(field));
          for (let i = 0; i < selectedFields.length; i += 1) {
            const field = selectedFields[i];
            if (field === 'league_average') {
              obj['リーグ平均入場者数'] = Math.round((datum.league_attd ?? 0) / (datum.league_games ?? 1));
            } else if (field === 'unit_price') {
              obj['客単価'] = Math.round(((datum.ticket ?? 0) * 1000000) / (datum.all_attd ?? 1));
            } else if (dict && dict[field]) {
              obj[dict[field]] = datum[field];
            }
          }
          return obj;
        })
        .sort(
          (a, b) =>
            a['年'] - b['年'] ||
            allCategories.indexOf(getCategory(a['所属'])) - allCategories.indexOf(getCategory(b['所属'])) ||
            allClubs.indexOf(a.id) - allClubs.indexOf(b.id)
        ),
    [allDataset, clubsFilter, yearsFilter, categoriesFilter, fields, dict, allClubs, allCategories]
  );
  const ItemFilterTab = React.useMemo(
    () => (
      <Container maxWidth="md">
        <Typography paragraph>データのアイテムを選択</Typography>
        <ItemFilter
          clubsFilter={clubsFilter}
          setClubsFilter={setClubsFilter}
          yearsFilter={yearsFilter}
          setYearsFilter={setYearsFilter}
          categoriesFilter={categoriesFilter}
          setCategoriesFilter={setCategoriesFilter}
        />
      </Container>
    ),
    [clubsFilter, setClubsFilter, yearsFilter, setYearsFilter, categoriesFilter, setCategoriesFilter]
  );
  const FieldFilterTab = React.useMemo(
    () => (
      <Container maxWidth="md">
        <Typography paragraph>データの項目を選択</Typography>
        <FieldFilter fields={fields} setFields={setFields} />
      </Container>
    ),
    [fields, setFields]
  );
  const PreviewItem = React.useMemo(
    () => (
      <Container maxWidth="md">
        <Preview dataset={dataset} />
      </Container>
    ),
    [dataset]
  );

  return (
    <Layout title="データダウンロード">
      {isMobile ? (
        <div>
          <Tabs value={tab} textColor="secondary" onChange={handleTabChange}>
            <Tab label="フィルタ" value={0} />
            <Tab label="項目" value={1} />
            <Tab label="プレビュー" value={2} />
          </Tabs>
          <SwipeableViews index={tab} onChangeIndex={handleChangeIndex} resistance>
            <TabPane value={tab} index={0}>
              {ItemFilterTab}
            </TabPane>
            <TabPane value={tab} index={1}>
              {FieldFilterTab}
            </TabPane>
            <TabPane value={tab} index={2}>
              {PreviewItem}
            </TabPane>
          </SwipeableViews>
        </div>
      ) : (
        <div className={classes.root}>
          <div className={classes.tabPane}>
            <Tabs value={tab} textColor="secondary" onChange={handleTabChange}>
              <Tab label="フィルタ" value={0} />
              <Tab label="項目" value={1} />
            </Tabs>
            <div>
              <TabPane value={tab} index={0}>
                {ItemFilterTab}
              </TabPane>
              <TabPane value={tab} index={1}>
                {FieldFilterTab}
              </TabPane>
            </div>
          </div>
          <div className={classes.tabPane}>{PreviewItem}</div>
        </div>
      )}
      <ContentBasisLarge>
        <AdInArticle />
      </ContentBasisLarge>
    </Layout>
  );
}

export default DownloadPage;
*/
export const query = graphql`
  query {
    allData(sort: { fields: [year, slug] }) {
      edges {
        node {
          ...generalFields
          ...seasonResultFields
          ...plFields
          ...bsFields
          ...revenueFields
          ...expenseFields
          ...attdFields
        }
      }
    }
    j1: allClub(filter: { category: { eq: "J1" } }) {
      edges {
        node {
          name
          slug
        }
      }
    }
    j2: allClub(filter: { category: { eq: "J2" } }) {
      edges {
        node {
          name
          slug
        }
      }
    }
    j3: allClub(filter: { category: { eq: "J3" } }) {
      edges {
        node {
          name
          slug
        }
      }
    }
    allYear(sort: { fields: year }) {
      edges {
        node {
          year
        }
      }
    }
  }
`;
