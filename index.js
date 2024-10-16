
Vue.createApp({
    data() {
        return {
            isFormVisible: false, 
            isFormVisible1: false, 
            isFormVisible3: false, 
            name: null,
            title: null,
            Movies: [],
            Peoples: [],
            error: null, 
            getId: null,
            add: {
                titleType: '',        
                primaryTitle: '',     
                originalTitle: '',     
                isAdult: false,         
                startYear: null,       
                endYear: null,        
                runtimeMinutes: null,  
                genres: ''             
            },         
            addPeople: {
                name: '',
                birthYear: null,
                deathYear: null,
                primaryProfession: '',
                knownForTitles: ''
            },
            update: {
                tconst: null,
                titleType: '',
                primaryTitle: '',
                originalTitle: '',
                isAdult: false,
                startYear: null,
                endYear: null,
                runtimeMinutes: null,
                genres: ''
            }
            
            
        };
    },
    methods: {


        async getById() {
            const url = "http://localhost:5245/api/Movies/" + this.getId;
            try {
                const res = await axios.get(url)
                this.Movies = [res.data];
               console.log(this.Movies)
            } catch (e) {
                alert("Movie NOT FOUND");
                this.error = e
            }
        },
        async filterByName(name) {
            const url = "http://localhost:5245/api/Movies/searchByName?name=" +  encodeURIComponent(name);

            try {
                const res = await axios.get(url)
                this.Peoples = res.data;
               console.log(this.Peoples)
            } catch (e) {
                this.error = e
            }
        },
        async filterByTitle(title) {
            const url = "http://localhost:5245/api/Movies/searchByTittle?title=" + encodeURIComponent(title);

            try {
                const res = await axios.get(url)
                this.Movies = res.data;
               console.log(this.Movies)
            } catch (e) {
              
                this.error = e
            }
        },
        


        async addMethod() {
            try {
                // 确保字段类型正确
                this.add.startYear = this.add.startYear ? parseInt(this.add.startYear, 10) : null;
                this.add.endYear = this.add.endYear ? parseInt(this.add.endYear, 10) : null;
                this.add.runtimeMinutes = this.add.runtimeMinutes ? parseInt(this.add.runtimeMinutes, 10) : null;
        
                // 不再需要手动处理 isAdult 的布尔值
                this.add.genres = this.add.genres === '' ? null : this.add.genres;
        
                console.log(this.add);  
                const url = "http://localhost:5245/api/Movies";
                const response = await axios.post(url, this.add, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                if (response.data && response.data.Message) {
                    alert(response.data.Message);
                } else {
                    alert("Add successfully");
                }
            } catch (ex) {
                console.error(ex);  
                alert(ex.message);  
            }
        },
        
        async addPeopleMethod() {
            try {
                
                this.addPeople.birthYear = this.addPeople.birthYear ? parseInt(this.addPeople.birthYear, 10) : null;
                this.addPeople.deathYear = this.addPeople.deathYear ? parseInt(this.addPeople.deathYear, 10) : null;
                this.addPeople.primaryProfession = this.addPeople.primaryProfession === '' ? null : this.addPeople.primaryProfession;
                this.addPeople.knownForTitles = this.addPeople.knownForTitles === '' ? null : this.addPeople.knownForTitles;
        
                console.log(this.addPeople);  
                const url = "http://localhost:5245/api/Movies/addPerson";
                const response = await axios.post(url, this.addPeople, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                if (response.data && response.data.Message) {
                    alert(response.data.Message);
                } else {
                    alert("Add successfully");
                }
            } catch (ex) {
                console.error(ex);  
                alert(ex.message);  
            }
        },
        async deleteMethod() {
            const url = "http://localhost:5245/api/Movies/deleteMovie/"+ this.getId
            try {
                console.log(this.getId)
                response = await axios.delete(url)
                alert("Delete successfully");
            } catch (ex) {
                alert(ex.message)
            }
        },
       
         async updateMethod() {
            try {
                this.update.startYear = this.update.startYear ? parseInt(this.update.startYear, 10) : null;
                this.update.endYear = this.update.endYear ? parseInt(this.update.endYear, 10) : null;
                this.update.runtimeMinutes = this.update.runtimeMinutes ? parseInt(this.update.runtimeMinutes, 10) : null;
                this.update.genres = this.update.genres === '' ? null : this.update.genres;
        
                console.log(this.update);  
                const url = "http://localhost:5245/api/Movies/updateMovie/"+ this.update.tconst;
                const response = await axios.put(url, this.update, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                if (response.data && response.data.Message) {
                    alert(response.data.Message);
                } else {
                    alert("Update successfully");
                }
            } catch (ex) {
                if (ex.response && ex.response.data && ex.response.data.exception) {
                    alert(ex.response.data.exception);
                } else {
                    alert("An error occurred while updating the movie.");
                }
            }
        }
    }



}).mount("#app")