console.log("Test")

const baseUri = "https://webapicar20190326034339.azurewebsites.net/api/cars"

Vue.createApp({
    data() {
        return {
            newlist: [],
            carslist: [],
            error: null,
            statuscode: null,
            getCarId: "",
            carId: null,
            carVendor:"",
            carModel:"",
            carPrice:null,
            deleteCarId:null
            

        }
    },
    created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        this.GetAllCars()
    },

    methods: {
        cleanList() {
            this.carslist = [];
            this.error = null;
            console.log("amount of cars : " + this.carslist.length);
        },

        GetAllCars() {
            axios.get(baseUri)
            .then(response => {
                var divtag = document.getElementById("content");

                console.log("In function GetAllCars")
                console.log("Status code:" + response.statuscode);

                //Add the returning data from the webservice to the variable carlists
                this.carslist = response.data;
                this.statuscode = response.status

                console.log("length of the carlist array" + this.carslist.length)
            })
            .catch(error = (ex) =>{
                this.carslist = []
                    this.error = ex.message
                console.log("Error:" + this.error)
            })
        },

        getByCarId(id){
            uri = baseUri + "/" + id
            axios.get(uri)
            .then(response => {
                console.log("Uri: " + uri)
                console.log("Status code: "+ response.statuscode)

                this.carslist = []
                this.carslist.push(response.data)
                this.status = response.status

                console.log("length of the carlist " + this.carslist.length)

            })
            .catch(error = (ex) => {
                this.carslist = []
                this.error = ex.message
                console.log("Error:" + this.error)
            })
        },

        PostCar(){
            axios.post(baseUri,{"id":this.carId,"vendor":this.carVendor,"model":this.carModel,"price":this.carPrice})
            .then(response => {
                console.log("PostCar status code: "+ response.statuscode)
                this.status = response.status;

                console.log("Length of cars array " + this.carslist.length)
            })
            .catch(error = (ex) => {
                this.carslist = []
                this.error = ex.message
                console.log("Error:" + this.error);
            })

        },
        deleteByCarId(id){
            uri = baseUri + "/" + id
            axios.delete(uri)
            .then(response => {
                console.log("Uri: " + uri)
                console.log("deleteByCarId. Status code: "+ response.status);

                this.carslist = this.GetAllCars();
                this.status = response.status;

                //console.log("Length of the carlist: " + this.carslist.length)
            })
            .catch(error = (ex) => {
                this.carslist = []
                this.error = ex.message
                console.log("Error:" + this.error)
            })
        }

        }
}).mount("#app")