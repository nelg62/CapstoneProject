import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Paper, Rating, Skeleton } from "@mui/material";

export default function AlignItemsList({ product }) {
  const [loading, setLoading] = React.useState(true);

  // Set loading to false if product and product.reviews are available
  React.useEffect(() => {
    if (product && product.reviews) {
      setLoading(false);
    }
  }, [product]);

  return (
    <Paper>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {product.reviews.map((review, index) => (
          <React.Fragment key={index}>
            <ListItem>
              {loading ? (
                <Skeleton variant="circular" width={40} height={40}></Skeleton>
              ) : (
                // Reviewer Avatar
                <ListItemAvatar>
                  <Avatar
                    alt={review.reviewerName}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
              )}
              <ListItemText>
                {loading ? (
                  <Skeleton></Skeleton>
                ) : (
                  // Reviewer name
                  <Typography>{review.reviewerName}</Typography>
                )}

                {loading ? (
                  <Skeleton variant="body2"></Skeleton>
                ) : (
                  // Reviewer Rating
                  <Typography variant="body2" color="text.secondary">
                    <Rating value={review.rating} readOnly precision={0.5} />
                  </Typography>
                )}
              </ListItemText>

              <ListItemText>
                {loading ? (
                  <Skeleton></Skeleton>
                ) : (
                  // Reviewer comment
                  <Typography color="text.secondary">
                    {review.comment}
                  </Typography>
                )}
              </ListItemText>

              <ListItemText>
                {loading ? (
                  <Skeleton variant="body2"></Skeleton>
                ) : (
                  // Date of comment by Reviewer
                  <Typography variant="body2" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                )}
              </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
