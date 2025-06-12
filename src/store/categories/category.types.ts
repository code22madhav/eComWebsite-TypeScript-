export enum CATEGORIES_ACTION_TYPE {
    FETCH_CATEGORIES_START= 'categoreis/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS='categories/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED='categories/FETCH_CATEGORIES_FAILED'
}

export type CategoryItem={
    id: number,
    imageUrl: string,
    name: string,
    price: number,
}

export type Category={
    title: string,
    imageUrl: string,
    items: CategoryItem[],
}

export type CategoryMap={
    [key:string]:CategoryItem[],
}

/*In typeScript it follows the sameway how we make key value payer here aslo we give square brackets 
for key and then we can add the dataType of key */
