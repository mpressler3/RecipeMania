<template>
    <div class="add-recipe">
        <h1>Add your own recipe!</h1>

        <div class="heading">
            <h2>Create Recipe</h2>
        </div>
        <div class="create">
            <div class="form">
                <input/>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'AddRecipe',
    data() {
        return {
            title: "",
            description: "",
            ingredients: [],
            singleIngredient: "",
            addRecipe: null,
            recipes: [],
        }
    },
    methods: {
        async upload() {
            try {
                let r1 = await axios.post('/api/recipes', {
                    title: this.title,
                    description: this.description,
                    ingredients: this.ingredients,
                });
                this.addRecipe = r1.data;
            }catch(error) {
                console.log(error);
            }
        }
    },
}

</script>