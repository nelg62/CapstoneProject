import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Box, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartContext } from "@/context/CartContext";

// function groupBy(array) {
//   return array.reduce((result, item) => {
//     // console.log("groupbyresult", result, item);
//     const foundProduct = result.find(
//       (i) => i.product && i.product.productId == item.productId
//     );
//     // console.log("foundproduct", foundProduct);
//     if (!foundProduct) {
//       result.push({ product: item, items: [item] });
//     } else {
//       // console.log("found items", foundProduct);
//       foundProduct.items.push(item);
//       // console.log("else product found", foundProduct);
//     }

//     return result;
//   }, []);
// }

export default function CartListItems() {
  const { cart, AddToCart, RemoveFromCart } = useCartContext();

  // const cartGroups = React.useMemo(() => groupBy(cart), [cart]);

  // console.log("cartgroup", cartGroups);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "10px",
        marginLeft: "10px",
      }}
    >
      <Paper sx={{ display: "flex" }}>
        <List
          dense
          sx={{
            width: "100%",
            //   maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {cart.map((item) => {
            // console.log("item map group", item);

            const labelId = `checkbox-list-secondary-label-${item.productId}`;
            return (
              <ListItem key={item.productId} disablePadding>
                <ListItemButton>
                  <Box
                    component="img"
                    sx={{
                      height: 60,
                      display: "block",
                      maxWidth: 60,
                      overflow: "hidden",
                      width: "100%",
                    }}
                    alt={item.title}
                    src={item.thumbnail}
                  ></Box>
                  {/* <ListItemAvatar>
                    <Avatar
                      
                    />
                  </ListItemAvatar> */}
                  <ListItemText id={labelId} primary={item.title} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => RemoveFromCart(1, item.productId)}
                >
                  <RemoveIcon />
                </ListItemButton>
                <ListItemText>{item.quantity}</ListItemText>
                <ListItemButton>
                  <AddIcon onClick={() => AddToCart(1, item.productId)} />
                </ListItemButton>
                <ListItemText>${item.price}</ListItemText>
                {/* <ListItemButton>
                  <DeleteIcon />
                </ListItemButton> */}
              </ListItem>
            );
          })}
        </List>
      </Paper>

      <Typography sx={{ float: "right" }}>Total $ amount</Typography>
    </Box>
  );
}
