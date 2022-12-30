# Ticker

Новостная строка / бегущая строка.

### Пример

```typescript
import { Ticker } from "@/shared/ticker";

const ExampleComponent = () => {
  return (
    <div>
      <Ticker className={styles.Ticker}>
        <span>
          <ul style={{display: "flex"}}>
            <li>
              <div className={styles.TickerCard}>1</div>
            </li>
            <li>
              <div className={styles.TickerCard}>2</div>
            </li>
            <li>
              <div className={styles.TickerCard}>3</div>
            </li>
            <li>
              <div className={styles.TickerCard}>4</div>
            </li>
          </ul>
        </span>
      </Ticker>
    </div>
  );
}
```

### API

```typescript
interface TickerProps {
  children: React.ReactChild | string;
  className?: string;
  speed?: number;
  shift?: number;
}
```