export default class DOM {

    AnimationTime = 1000;

    $ = (s, o = document) => o.querySelector(s);
    // $$ = (s, o = document) => o.querySelectorAll(s);

    steps = [];

    $interval = new Rx.Observable.interval(this.AnimationTime);
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
            this.$dataflow = new Rx.BehaviorSubject(steps).switchMap(
                () => {
                    return this.$interval
                }
            ).subscribe(value => {


                this.$('#navigate').classList.add('navigation_animation');
                this.$('#navigate').style.animationDuration = (this.AnimationTime / 1000) + 's';

                this.$('#progressBar').classList.add('progressBar_animation');
                this.$('#progressBar').style.animationDuration = (this.AnimationTime / 1000) + 's';

                this.$('#title').innerHTML = this.steps[value].maneuver.instruction;
                this.$('#discription').innerHTML = this.steps[value].name;
                this.$('#sign').innerHTML = this.directionsIcon[this.steps[value].maneuver.modifier];
                
                if (value === this.steps.length - 1) {

                    console.log(this.$('#navigate').classList);
                    this.$('#navigate').classList.remove('navigation_animation');
                    this.$('#progressBar').classList.remove('progressBar_animation');

                    this.$dataflow.unsubscribe();

                }

            })
        }


    }

}