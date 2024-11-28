import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Divider,
} from "@mantine/core";

const AboutPage = () => {
  return (
    <Container size='lg' py='xl' mt='3.5rem'>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title order={1}>ABOUT US</Title>
      </div>
      <Divider size='md' mb='xl' />

      <Grid gutter='lg' align='stretch'>
        <Grid.Col span={6}>
          <div style={{ height: "100%", textAlign: "center" }}>
            <a
              href='https://www.vecteezy.com/photo/33692644-chef-preparing-food-in-the-kitchen-at-the-restaurant-professional-chef-cooking-gourmet-chef-cooking-in-a-commercial-kitchen-ai-generated'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='https://static.vecteezy.com/system/resources/previews/033/692/644/original/chef-preparing-food-in-the-kitchen-at-the-restaurant-professional-chef-cooking-gourmet-chef-cooking-in-a-commercial-kitchen-ai-generated-free-photo.jpg'
                alt='Chef preparing food in the kitchen'
                radius='md'
                style={{ height: "100%", objectFit: "cover" }}
              />
            </a>
          </div>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow='sm' padding='lg' radius='md' style={{ height: "100%" }}>
            <Title order={2} style={{ marginBottom: "1rem" }}>
              Who We Are
            </Title>

            <Text size='lg'>
              At Royal Fried Chicken, we are passionate about serving delicious,
              high-quality meals that bring people together. Inspired by the
              legendary flavors of Southern-style fried chicken, we have created
              a menu that combines crispy perfection with mouthwatering spices.
              From our humble beginnings, our mission has been to provide a
              memorable dining experience for every customer. Whether you're
              enjoying a quick meal on the go or gathering with loved ones,
              Royal Fried Chicken delivers the perfect combination of flavor,
              freshness, and hospitality.
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Divider size='md' my='xl' />

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title order={2}>Our Vision</Title>
      </div>

      <Text size='md' style={{ textAlign: "center", marginBottom: "2rem" }}>
        At Royal Fried Chicken, our vision is to revolutionize the fast-food
        industry by setting new standards for quality, flavor, and customer
        experience. We aim to build a global community of fried chicken
        enthusiasts who share our love for bold, authentic tastes. We dream of a
        world where every bite of our chicken sparks joy and creates lasting
        memories. With innovation at our core, we are constantly evolving to
        meet the needs of our customers while staying true to our roots.
      </Text>

      <Grid gutter='lg'>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' style={{ height: "100%" }}>
            <Title order={3} style={{ marginBottom: "1rem" }}>
              Innovation
            </Title>
            <Text size='sm' color='dimmed'>
              At Royal Fried Chicken, we never stop innovating. From creating
              unique flavors to exploring new ways of delivering your favorite
              meals, we stay ahead of the curve to ensure every visit is a
              delightful experience.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' style={{ height: "100%" }}>
            <Title order={3} style={{ marginBottom: "1rem" }}>
              Excellence
            </Title>
            <Text size='sm' color='dimmed'>
              Excellence is at the heart of everything we do. We take pride in
              every piece of chicken we serve, ensuring it meets the highest
              standards of quality, taste, and presentation.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow='sm' padding='lg' radius='md' style={{ height: "100%" }}>
            <Title order={3} style={{ marginBottom: "1rem" }}>
              Customer Focus
            </Title>
            <Text size='sm' color='dimmed'>
              Our customers are our priority. From the moment you step into our
              restaurant to the last bite of your meal, we are dedicated to
              making your experience special. At Royal Fried Chicken, you’re
              family.
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AboutPage;
