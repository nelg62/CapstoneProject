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

function groupBy(array) {
  return array.reduce((result, item) => {
    const foundProduct = result.find(
      (i) => i.product && i.product.productId == item.productId
    );
    if (!foundProduct) {
      result.push({ product: item, items: [item] });
    } else {
      foundProduct.items.push(item);
    }

    return result;
  }, []);
}

export default function CartListItems() {
  const { cart, AddToCart, RemoveFromCart } = useCartContext();

  const cartGroups = React.useMemo(() => groupBy(cart), [cart]);

  console.log("cartgroup", cartGroups);

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
          {cartGroups.map((group) => {
            console.log("item map group", group);

            const labelId = `checkbox-list-secondary-label-${group.product.id}`;
            return (
              <ListItem key={group.product.id} disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={group.product.title}
                      src={group.product.thumbnail}
                    />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={group.product.title} />
                </ListItemButton>
                <ListItemButton
                  onClick={() => RemoveFromCart(1, group.product.productId)}
                >
                  <RemoveIcon />
                </ListItemButton>
                <ListItemText>{group.items.length}</ListItemText>
                <ListItemButton>
                  <AddIcon
                    onClick={() => AddToCart(1, group.product.productId)}
                  />
                </ListItemButton>
                <ListItemText>${group.product.price}</ListItemText>
                <ListItemButton>
                  <DeleteIcon />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>

      <Typography sx={{ float: "right" }}>Total $ amount</Typography>
    </Box>
  );
}
