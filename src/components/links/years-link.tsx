import * as React from "react";
import { navigate } from "gatsby";
import NativeSelect from "@mui/material/NativeSelect";
import NoSsr from "@mui/material/NoSsr";
import Skeleton from "@mui/material/Skeleton";
import { AppLinkButton, useIsMobile } from "@cieloazul310/gatsby-theme-aoi";
import { useAllYears } from "@/utils";

export function YearsLink() {
  const isMobile = useIsMobile();
  const years = useAllYears(isMobile ? "desc" : "asc");
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(event.target.value);
  };
  const core = React.useMemo(() => {
    if (isMobile) {
      return (
        <NativeSelect value="" onChange={onChange}>
          <option disabled value="">
            年度別経営情報
          </option>
          {years.map(({ id, href, year }) => (
            <option key={id} value={href}>
              {year}年度経営情報
            </option>
          ))}
        </NativeSelect>
      );
    }
    return (
      <>
        {years.map((node) => (
          <AppLinkButton
            key={node.year.toString()}
            href={node.href}
            color="inherit"
          >
            {node.year}
          </AppLinkButton>
        ))}
      </>
    );
  }, [isMobile, years]);

  return (
    <NoSsr fallback={<Skeleton variant="rounded" width={160} />}>{core}</NoSsr>
  );
}

export default YearsLink;
