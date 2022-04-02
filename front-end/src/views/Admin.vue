<template>
    <div class="admin">
        <div class="add-food">
            <h2>Add your own recipe!</h2>

            <div class="heading">
                <h3>Create Recipe</h3>
            </div>
            <div class="create">
                <div class="form">
                    <input/>
                </div>
            </div>
        </div>


        <!--Edit pets below this line-->
    </div>

    
</template>

<style scoped>
.admin {
    text-align: left;
    align-items: left;
    justify-content: left;
    display: flex;
}

</style>

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
        },
        //pets below
    },
}

</script>