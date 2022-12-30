# Carousel

When there is a group of content on the same level that horizontally extends beyond the screen.
Usually used for a group of pictures/cards.

## Example

```tsx
<Carousel
  mode="continuous"
  align="center"
  id="сarousel"
  childrenAnimationFunction={(options) => {
    carouselChildrenAnimation({ 
      ...options, // see 
      header // trigger element
    });
  }}
  triggerFunction={triggerAnimations.bounce}
  inertionCorrection={false}
  elementsPerScreen={[
    {
      breakpoint: 320,
      number: 3,
    },
    {
      breakpoint: 640,
      number: 4,
    },
    {
      breakpoint: 1024,
      number: 5,
    },
    {
      breakpoint: 1500,
      number: 6,
    },
    {
      breakpoint: 1800,
      number: 8,
    },
  ]}>
    <div key={key} className={styles.Card}>
      <img src={"https://picsum.photos/200/300"} />
      <p>The World Wide Web Consortium was founded in 1994.</p>
    </div>
    <div key={key} className={styles.Card}>
      <img src={"https://picsum.photos/200/300"} />
      <p>The World Wide Web Consortium was founded in 1994.</p>
    </div>
    <div key={key} className={styles.Card}>
      <img src={"https://picsum.photos/200/300"} />
      <p>The World Wide Web Consortium was founded in 1994.</p>
    </div>
    <div key={key} className={styles.Card}>
      <img src={"https://picsum.photos/200/300"} />
      <p>The World Wide Web Consortium was founded in 1994.</p>
    </div>
  </Carousel>
```

## Styles

The component is independent of CSS styles.

### Recomendations

When using images (added via the `<img/>` tag) inside the Carousel component, add a property to them `user-select: none;`

```CSS
.Carousel .Card_Image {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none
}
```
