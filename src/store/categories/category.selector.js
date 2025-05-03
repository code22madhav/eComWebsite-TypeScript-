import { createSelector } from "reselect";

const selectcategoriesReducer=((state)=>{
  // console.log('one')
   return state.categories});


export const selectCategories=createSelector(
  [selectcategoriesReducer],
  (categoriesSlice)=>categoriesSlice.categories
);

/*Now the function is memonized here is the brief of the boiler plate for memonization
first wrap the fun in createSelector then there it will be in this format createSelector([],()=>{}) array
takes the dependecy for which reducer it has to look now whatever is passed in array becomes 
argument for function therefore just for naming you can write anything in our case we wrote categories

In this example we are just memonizing twice one in categorySelector and one in selectCategories we don't
really nead to do this just doing for the sake of learing in the selectCategoris only the array is
destructed from the reducer therfore we are directly doing categories.redude here*/
export const categorySelector=createSelector(
  [selectCategories], (categories)=>{
    // console.log('first')
    return categories.reduce((acc,data)=>{
      const {title, items}=data;
      acc[title.toLowerCase()]=items;
      return acc;
    },{})}
  );

  /*This was an ordinary way to write selector without using reselect here what will happens whenever 
  any of the reducer changes in root reducer and store state updates it will couse unnecessay rendering
  code:
  export const categorySelector=((state)=>{
  const categoreisMap=state.categories.categories.reduce((acc,data)=>{
      const {title, items}=data;
      acc[title.toLowerCase()]=items;
      return acc;
    },{})
  return categoreisMap}
  );
   */

  /*Two things to note here:
  1st As mentioned whenever any dispact happens and the store is updated with new state all the useSelector
  reruns therefore cousing unnecessay rerendering therefore we use ReSelect library to tackle this
  but before this there one thing to note our code is written in such a way that whenver useSelector runs we
  are using reduce which pass us a new object everytime therefore for the first time if it reduces over
  a empty array it doesn't rerender as earlier state is underfined and reducing over emyty array creates an
  empty object which when setas categoreisMap gives us undefined
  
  2nd thing:
  moving the logic of desctructing the data from firebase utils to useSelector has merit and the demerits
  aslo as you can see eveytime useSelector runs it throws us a new object after reducing.*/


