import { FC } from "react"
import { Stack, Typography } from "@mui/material"
import { WooviLogo } from "../../components"

interface PageHeaderI {
  title: string
}

export const PageHeader: FC<PageHeaderI> = ({ title }) => {
  return (
    <Stack alignItems="center" spacing={4}>
      <WooviLogo
        sx={{
          width: 123,
          height: "auto",
          mx: "auto",
        }}
      />
      <Typography
        variant="heading1"
        textAlign="center"
        color="neutral.dark"
        px={[3, 0]}
      >
        {title}
      </Typography>
    </Stack>
  )
}
