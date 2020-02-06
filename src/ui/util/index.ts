const shuffleArray = (array: any[])=>
{
    let x: number;
    let y: number;

    let a: number[] = [...array];

    for (let i = array.length - 1; i > 0; i--) 
    {
        y = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[y];
        a[y] = x;
    }

    return a;
}

export {shuffleArray};