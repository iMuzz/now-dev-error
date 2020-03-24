import * as React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import page from "../lib/pageSetup";

import { IInfluencer } from "../../types";
import { GET_INFLUENCERS } from "../graphql/posts";

const Home = () => {
  const { data, loading } = useQuery(GET_INFLUENCERS);

  if (loading) return "";
  const { influencers }: { influencers: Array<IInfluencer> } = data;

  const renderInf = (influencers: Array<IInfluencer>) => {
    return influencers.map(influencer => {
      return (
        <div className="link">
          <Link href={`/[slug]/essays`} as={`/${influencer.slug}/essays`}>
            {`/${influencer.slug}/essays`}
          </Link>
          <style jsx>
            {`
              .link {
                margin: 20px;
              }
            `}
          </style>
        </div>
      );
    });
  };
  return (
    <div>
      <div>{renderInf(influencers)}</div>
    </div>
  );
};

export default page(Home);
