# Carousel

Визуальный компонент. Используется, когда на одном уровне вложенности есть группа контента, которая по горизонтали выходит за пределы экрана. Обычно используется для группы карточек, изображений.

## Пример

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

## Стили

Стили компонента задаются извне

### Рекомендации

При использовании изображений (добавленных через тег `<img/>`) внутри компоненте Carousel, добавить изображениям тег `user-select: none;`

```CSS
.Carousel .Card_Image {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-drag: none
}
```
