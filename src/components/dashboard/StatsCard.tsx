import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import type { StatsCardProps } from "../../interfaces/dashboard.interfaces";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {value}
            </Typography>
          </Box>

          <Avatar sx={{ bgcolor: bgColor, color, width: 48, height: 48 }}>
            <Icon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}
