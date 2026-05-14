import { Card, CardContent, Skeleton } from "@mui/material";

export function SkeletonCard() {
  return (
    <Card component="article" aria-hidden="true" sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" width="100%" height={300} />
      <CardContent>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
      </CardContent>
    </Card>
  );
}
