import { Flex, Grid, Text } from "@radix-ui/themes";
import IssueChart from "./issueChart";
import IsuesSummary from "./issueSummary";
import LatestIssues from "./latestIssues";
import prisma from "@/prisma/client";
import { Metadata } from "next";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: Props) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap='5'>
    <Text>Dashbaord</Text>
      <Flex direction='column' gap='5'>
        <IsuesSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};