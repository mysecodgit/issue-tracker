import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadIssueDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="4" my="3">
        <Skeleton width="5rem"/>
        <Skeleton width="5rem"/>
      </Flex>
      <Card className="prose mt-4 p-3">
        <Skeleton count={3}/>
      </Card>
    </Box>
  );
};

export default LoadIssueDetailsPage;
