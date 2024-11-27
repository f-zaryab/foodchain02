import { Image, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import classes from "./FeaturedItem.module.css";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.pexels.com/photos/14678750/pexels-photo-14678750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/6252741/pexels-photo-6252741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/5864593/pexels-photo-5864593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/27626465/pexels-photo-27626465/free-photo-of-authentic-mexican-food.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const FeaturedItems = () => {
  const navigate = useNavigate();

  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <div className={classes.imageContainer}>
        <div className={classes.btnOverlay}>
          <Button
            variant="filled"
            color="red.0"
            radius="sm"
            className={classes.exploreMenuBtn}
            onClick={() => navigate("#menu", { state: { targetId: "menu" } })}
          >
            Explore Menu
          </Button>
        </div>
        <Image src={url} className={classes.imageStyles} />
      </div>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      height={"100vh"}
      loop
      withIndicators
      nextControlIcon={
        <IconArrowRight
          style={{
            width: "2rem",
            height: "2rem",
            color: "white",
            background: "red",
            borderRadius: "50%",
          }}
        />
      }
      previousControlIcon={
        <IconArrowLeft
          style={{
            width: "2rem",
            height: "2rem",
            color: "white",
            background: "red",
            borderRadius: "50%",
          }}
        />
      }
      classNames={classes}
    >
      {slides}
    </Carousel>
  );
};

export default FeaturedItems;
