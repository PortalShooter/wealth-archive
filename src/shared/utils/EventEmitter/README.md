# EventEmitter

Классический event emitter с возможной **(не обязательной)** разбивкой событий на каналы.
Код полностью обратно совместим со старым EventEmitter-ом без подписки на каналы.  
Является зависимостью у **dispatcher**-а и всех **store**-ов при использовании FLUX архитектуры.  
Имеет набор проверок на самые распространенные ошибки при использовании EventEmitter-а.

### Синтаксис

**Создание**

```javaScript
var eventEmitter = new EventEmitter();
```

**Подписка**

```javaScript
// подписка на все каналы
eventEmitter.subscribe(handler);
// или подписка на один канал
eventEmitter.subscribe('channel_name', handler);
```

**Отписка**

```javaScript
// отписка от всех каналов
eventEmitter.unsubscribe(handler);
// или отписка от конкретного канала
eventEmitter.unsubscribe('channel_name', handler);
```

**Вызов события**

```javaScript
// вызов в общий канал
eventEmitter.dispatch(action);
// или вызов в определенный канал
eventEmitter.dispatch('channel_name', action);
```

**handler** - это функция-обработчик
**action** - объект события с обязательным полем **type**

### Событие (action) во FLUX архитектуре

Событие - это объект, который обязательно должен содержать свойство **type**.  
Остальные свойтва могут быть любыми.  
Type может быть любым, но при разделении строки точкой с запятой, событие будет отправлено в определенный канал.  
Даже при подобном синтаксисе подписываться на определенный канал **не обязательно**, подписка на все каналы все равно поймает это событие.

```javaScript
{
	type: 'channel:name',
	...
}
```

Пример применения

```javaScript
eventEmitter.dispatch({
	type: 'popup:open',
	id: 'menu-popup'
});
```