import { useStaticQuery, graphql } from "gatsby";
import type { Club } from "types";

type UseClubsByCategoryQueryData = Record<
  "j1" | "j2" | "j3" | "others",
  { nodes: Pick<Club, "id" | "href" | "name" | "short_name" | "slug">[] }
>;

export default function useClubsByCategory() {
  const data = useStaticQuery<UseClubsByCategoryQueryData>(graphql`
    {
      j1: allClub(filter: { category: { eq: "J1" } }, sort: { index: ASC }) {
        nodes {
          id
          slug
          href
          name
          short_name
        }
      }
      j2: allClub(filter: { category: { eq: "J2" } }, sort: { index: ASC }) {
        nodes {
          id
          slug
          href
          name
          short_name
        }
      }
      j3: allClub(filter: { category: { eq: "J3" } }, sort: { index: ASC }) {
        nodes {
          id
          slug
          href
          name
          short_name
        }
      }
      others: allClub(
        filter: { category: { nin: ["J1", "J2", "J3"] } }
        sort: { index: ASC }
      ) {
        nodes {
          id
          slug
          href
          name
          short_name
        }
      }
    }
  `);
  return data;
}
