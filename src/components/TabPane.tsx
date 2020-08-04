import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

interface Props {
  visibility: boolean;
  table: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
  article: JSX.Element | JSX.Element[] | (JSX.Element | JSX.Element[])[];
}

function TabPane({ table, article, visibility }: Props) {
  const classes = useStyles();
  return visibility ? (
    <div>
      <section>
        <Container maxWidth="lg" disableGutters>
          {table}
        </Container>
      </section>
      <section>
        <Container className={classes.content} maxWidth="md">
          <article>{article}</article>
        </Container>
      </section>
    </div>
  ) : null;
}

export default TabPane;
