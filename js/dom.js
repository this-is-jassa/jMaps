export default class DOM {


    // #########################################################
    // ##################### Global Variables ##########################
    // #######################################################

    AnimationTime = 3000;
    $dataflow;

    $ = (s, o = document) => o.querySelector(s);
    steps = [];

    directionsIcon = {
        left: 'arrow_back',
        right: 'arrow_forward',
        "slight right": 'call_made',
        "slight left": 'arrow_back'
    }

    $interval = new Rx.Observable.interval(this.AnimationTime);

    constructor() { }



    // #########################################################
    // ##################### Helper Functions ##########################
    // #######################################################

    showSteps(steps = []) {

        try {
            this.steps = [...steps];

            this.$dataflow.unsubscribe();
            this.animateNavigation(false)

        } catch (err) { }

        finally {

            this.$dataflow = new Rx.BehaviorSubject(steps).switchMap(
                () => {
                    return this.$interval
                }
            ).subscribe(value => {

                this.animateNavigation(true, this.steps[value].maneuver.instruction, this.steps[value].name, this.directionsIcon[this.steps[value].maneuver.modifier]);

                if (value === this.steps.length - 1) {
                    this.animateNavigation(false);

                    this.$dataflow.unsubscribe();
                }

            })

        }

    }

    changeTheme(isDark) {
        const x = document.getElementsByTagName("BODY")[0];
        if (isDark) {
            x.classList.remove('light');
            x.classList.add('dark');
            return;
        }
        x.classList.remove('dark');
        x.classList.add('light');

    }

    reset() {
        try {
            this.$dataflow.unsubscribe();
            this.animateNavigation(false);


        } catch (err) { }
        finally {

            this.$('#address-input1').value = '';
            this.$('#address-input2').value = '';
        }
    }



    // Animating the Notifiction Popup
    animateNavigation(add = true, title = 'Loading', discription = 'Loading', sign = '', minutes = ' Loading') {

        if (add) {
            this.$('#navigate').classList.add('navigation_animation');
            this.$('#progressBar').classList.add('progressBar_animation');

            this.$('#navigate').style.animationDuration = (this.AnimationTime / 1000) + 's';
            this.$('#progressBar').style.animationDuration = (this.AnimationTime / 1000) + 's';

            this.$('#title').innerHTML = title;
            this.$('#discription').innerHTML = discription;
            this.$('#sign').innerHTML = sign;

        } else {
            this.$('#navigate').classList.remove('navigation_animation');
            this.$('#progressBar').classList.remove('progressBar_animation');
        }
    }

}
