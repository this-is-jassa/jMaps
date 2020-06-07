export default class DOM {


    $ = (s, o = document) => o.querySelector(s);
    AnimationTime = 5000;
    // $$ = (s, o = document) => o.querySelectorAll(s);

    steps = [];

    $interval = new Rx.Observable.interval(5000);
    $dataflow;

    directionsIcon = {
        left: 'arrow_back',
        right: 'arrow_forward',
        "slight right": 'call_made',
        "slight left": 'arrow_back'
    }



    constructor() { }

    showSteps(steps = []) {

        try {
            this.steps = [...steps];
            this.$dataflow.unsubscribe();


        } catch (err) {

        } finally {
            this.$dataflow = new Rx.BehaviorSubject([1, 2, 3]).switchMap(
                steps => {
                    return this.$interval
                }
            ).subscribe(value => {
                this.$('#navigate').style.animation = `navigate ${this.AnimationTime / 1000}s alternate-reverse infinite`;
                this.$('#progressBar').style.animation = `progress ${this.AnimationTime / 1000}s alternate-reverse infinite`
                this.$('#title').innerHTML =  this.steps[value].maneuver.instruction;
                this.$('#discription').innerHTML = this.steps[value].name;
                this.$('#sign').innerHTML = this.directionsIcon[this.steps[value].maneuver.modifier];

            })
        }


    }

}