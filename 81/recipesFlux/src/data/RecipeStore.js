import { ReduceStore } from 'flux/utils';
import RecipeActionTypes from './RecipeActionTypes';
import RecipeDispatcher from './RecipeDispatcher';

class RecipeStore extends ReduceStore {
    constructor() {
        super(RecipeDispatcher);
    }

    getInitialState() {
        return Object.freeze([
            {
                id: 1,
                name: 'Chicken Soup',
                ingredients: ['chicken', 'vegetables', 'spices', 'water'],
                directions: ['add water to pot', 'add vegetables', 'add chicken', 'add spices', 'bring to rapid boil', 'simmer for 1 and half hours'],
                picture: 'https://whatscookingamerica.net/wp-content/uploads/2017/09/Jewish-Chicken-Soup-closeup-1280x720.jpg'
              },
              {
                id: 2,
                name: 'Chulent',
                ingredients: ['meat', 'potatoes', 'beans', 'spices', 'water'],
                directions: ['add everything to pot', 'cook for at least 10 hours'],
                picture: 'http://1zbu2wo4b4720erk34pts2lh.wpengine.netdna-cdn.com/wp-content/uploads/2015/06/a1.jpg'
              }
        ]);
    }

    reduce(state, action) {
        switch (action.type) {
            case RecipeActionTypes.ADD_RECIPE:
                // Do nothing for now, we will add logic here soon!
                return state;

            default:
                return state;
        }
    }
}

export default new RecipeStore();