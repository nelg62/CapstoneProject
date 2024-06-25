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
    <>
      {product.reviews.map((review, index) => (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>

            <div key={index} style={{ marginBottom: "1rem" }}>
              <ListItemText
                primary={review.reviewerName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>

                    <Typography variant="body2" color="text.secondary">
                      <div>
                        <Rating
                          value={review.rating}
                          readOnly
                          precision={0.5}
                        />{" "}
                        {review.rating}
                      </div>
                    </Typography>
                    {review.comment}

                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </React.Fragment>
                }
              />
            </div>
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </>
  );
}
