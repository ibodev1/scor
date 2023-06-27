# Skor Algoritma Projesi

Bir gün evde tenis maçı izlerken skor tablosu benim ilgimi çekti. Ardından kendi skorlama algoritmamı yazmak istedim. Bu proje, `Typescript` kullanarak geliştirdiğim algoritmanın bir kullanım örneğini içermektedir.

![Algorithm](/algorithm.png)

## Eşitleme

Bu skorlama yönteminde, bir oyuncunun puanı arttığında, eğer oyuncu henüz puan almamışsa veya zaten birinci sırada ise puanı normal bir şekilde artar. Ancak, eğer birinci sırada değilse ve puanı arttırmadan önce artmış puanı birinci oyuncunun puanına eşit olursa, puanını artırmak yerine birinci oyuncunun puanını azaltır. Bu şekilde skorlar eşitlenmiş olur.

## Azaltma

Bu skorlama yönteminde, bir oyuncunun puanı arttırmadan önce diğer oyuncuların puanlarının sıfır olup olmadığı kontrol edilir. Eğer diğer oyuncuların puanları sıfır değilse, bu oyuncunun puanını artırmadan önce diğer oyuncuların puanlarını azaltır ve ardından kendi puanını yükseltir. Bu şekilde bir oyuncunun amacı, diğer oyuncuların puanlarını aşağı çekmektir.

## Kullanımı

[Player.ts](/class/Player.ts)
Oyuncu'yu temsil eder. Parametre olarak string alır ve oyuncunun ismini belirler. Geriye oyuncunun ismini, skorunu ve id sini dönderir.

```ts
const player = new Player("player 1");
```

[Scor.ts](/class/Scor.ts)
Skor sistemini temsil eder. Parametre olarak Skorlama çeşidini, oyuncuları ve kaçar kaçar artacağını belirten değer girilir.

```ts
const scor = new Scor(ScorType.EQUALIZATION, [player])
```

##### .add(player) function
Oyunculara yeni bir tane ekler.

```ts
scor.add(player)
```

##### .up(player) function
Verilen oyuncunun skorunu günceller.

```ts
scor.up(player)
```

##### .result() function
Sonuçları döndürür.

```ts
scor.result()

interface Result {
  winner: Player | null;
  changeCount: number;
  syncCount: number;
  players: Player[];
}
```

- winner: Kazanan oyuncuyu döner. Eğer sonuç berabereyse `null` döner.
- changeCount: Kaç kez değişiklik olduğunu döndürür.
- syncCount: Değeri arttırılan oyuncunun değeri eşitlendiğinde kaç kez eşitlendiğini döndürür.
- players: Oyuncuları birinciden sonuncuya olacak şelikde sıralanmış biçimde dönrürür. 

## Development

```
deno task start
```
