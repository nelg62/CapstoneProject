import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";

export default function AlignItemsList({ product }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {product.reviews.map((review, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={review.reviewerName}
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography variant="body2" color="text.secondary">
                <Rating value={review.rating} readOnly precision={0.5} />
                {review.rating}
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography variant="body2" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
