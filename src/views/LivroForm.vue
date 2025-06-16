<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card elevation="10" class="pa-6">
                    <v-card-title class="text-h5 text-center primary">
                        <span class="font-weight-bold">Publicar Um Livro</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="publicBook">
                            <!-- Disciplina Dropdown -->
                            <v-select
                                v-model="disciplina"
                                :items="disciplinas"
                                label="Disciplina"
                                prepend-inner-icon="mdi-book-open"
                                required
                            ></v-select>

                            <!-- Classe Radio Buttons -->
                            <v-radio-group
                                v-model="classe"
                                label="Classe"
                                row
                                required
                            >
                                <v-radio label="1ª Classe" value="1"></v-radio>
                                <v-radio label="2ª Classe" value="2"></v-radio>
                                <v-radio label="3ª Classe" value="3"></v-radio>
                            </v-radio-group>

                            <!-- Arquivo File Upload -->
                            <v-file-input
                                v-model="arquivo"
                                label="Arquivo"
                                prepend-inner-icon="mdi-upload"
                                required
                                show-size
                            ></v-file-input>

                            <v-btn type="submit" color="primary" block class="mt-4">
                                Publicar
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            disciplina: null,
            disciplinas: [
                'Matemática',
                'Português',
                'História',
                'Geografia',
                'Ciências'
            ],
            classe: null,
            arquivo: null
        };
    },
    methods: {
        publicBook() {
            // Handle form submission
            // Example: console.log(this.disciplina, this.classe, this.arquivo);
        }
    }
};
</script>