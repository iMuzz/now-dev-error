import React from "react";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";

import page from "../../../lib/pageSetup";

interface IProps {
  slug: string;
}

const EssayPage: NextPage<IProps, {}> = ({ slug }) => {
  return (
    <>
      <Head>
        <title>WaitWho.is | {slug}</title>
      </Head>
      <div>This is the influencer page {slug}</div>
    </>
  );
};

EssayPage.getInitialProps = async (ctx: NextPageContext) => {
  return { slug: ctx.query.slug };
};

export default page(EssayPage);
