import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map} from 'rxjs/operators';
import {zip} from 'rxjs';
import {format} from 'date-fns';
import RNFetchBlob from 'react-native-fetch-blob';
import KeepAwake from 'react-native-keep-awake';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#955251',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.blue,
    color: colors.white,
    margin: 20,
  },
  disabledButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#cccccc',
    color: '#666666',
    margin: 20,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    margin: 20,
  },
  BottomText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.white,
  },
  lastText: {
    fontSize: 16,
    color: colors.white,
  },
});

const finalValues = [];
const headerString =
  'iteration_number,acc_x_vals,acc_y_vals,acc_z_vals,gyro_x_vals,gyro_y_vals,gyro_z_vals,activity_name,timestamp\n';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textStatus: 'Do the current Activity: None',
      buttonDisabled: false,
      buttonText: 'Start',
      waitText: '',
      iterationNumber: 0,
    };
    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    setUpdateIntervalForType(SensorTypes.gyroscope, 200);
  }

  storeValues = (iterations, activityName) => {
    const accSubscription$ = accelerometer.pipe(
      map(({x, y, z}) => {
        return {
          accX: x,
          accY: y,
          accZ: z,
        };
      }),
    );
    const gyroSubscription$ = gyroscope.pipe(
      map(({x, y, z}) => {
        return {
          gyrX: x,
          gyrY: y,
          gyrZ: z,
        };
      }),
    );
    const example = zip(accSubscription$, gyroSubscription$);
    const disposeMe = example.subscribe(res => {
      const currArray = [];
      currArray.push(iterations);
      currArray.push(res[0].accX.toFixed(3));
      currArray.push(res[0].accY.toFixed(3));
      currArray.push(res[0].accZ.toFixed(3));
      currArray.push(res[1].gyrX.toFixed(3));
      currArray.push(res[1].gyrY.toFixed(3));
      currArray.push(res[1].gyrZ.toFixed(3));
      currArray.push(activityName);
      currArray.push(Date.now());
      finalValues.push(currArray);
    });
    setTimeout(() => {
      disposeMe.unsubscribe();
      this.setState({textStatus: 'Do the current Activity: 5 sec Break'});
    }, 15000);
  };

  onPress = () => {
    if (this.state.buttonText === 'Stop') {
      RNExitApp.exitApp();
      return;
    }
    this.setState({
      buttonDisabled: true,
      waitText: 'Please wait Until Data is Captured',
    });

    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Sitting',
        iterationNumber: 1,
      });
      this.storeValues(1, 'Sitting');
    }, 0);
    setTimeout(() => {
      this.setState({textStatus: 'Do the current Activity: Walking'});
      this.storeValues(1, 'Walking');
    }, 21000);
    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Walking Upstairs',
      });
      this.storeValues(1, 'Walking Upstairs');
    }, 42000);

    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Sitting',
        iterationNumber: 2,
      });
      this.storeValues(2, 'Sitting');
    }, 63000);
    setTimeout(() => {
      this.setState({textStatus: 'Do the current Activity: Walking'});
      this.storeValues(2, 'Walking');
    }, 84000);
    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Walking Upstairs',
      });
      this.storeValues(2, 'Walking Upstairs');
    }, 105000);

    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Sitting',
        iterationNumber: 3,
      });
      this.storeValues(3, 'Sitting');
    }, 126000);
    setTimeout(() => {
      this.setState({textStatus: 'Do the current Activity: Walking'});
      this.storeValues(3, 'Walking');
    }, 147000);
    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Walking Upstairs',
      });
      this.storeValues(3, 'Walking Upstairs');
    }, 168000);

    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Sitting',
        iterationNumber: 4,
      });
      this.storeValues(4, 'Sitting');
    }, 189000);
    setTimeout(() => {
      this.setState({textStatus: 'Do the current Activity: Walking'});
      this.storeValues(4, 'Walking');
    }, 210000);
    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Walking Upstairs',
      });
      this.storeValues(4, 'Walking Upstairs');
    }, 231000);

    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Sitting',
        iterationNumber: 5,
      });
      this.storeValues(5, 'Sitting');
    }, 252000);
    setTimeout(() => {
      this.setState({textStatus: 'Do the current Activity: Walking'});
      this.storeValues(5, 'Walking');
    }, 273000);
    setTimeout(() => {
      this.setState({
        textStatus: 'Do the current Activity: Walking Upstairs',
      });
      this.storeValues(5, 'Walking Upstairs');
    }, 294000);


    setTimeout(() => {
      const fileName = format(Date.now(), 'HH-mm-ss');
      for (let i = 0; i < finalValues.length; i += 1) {
        console.log(finalValues[i]);
        const rowString = finalValues
          .map(
            d =>
              `${d[0]},${d[1]},${d[2]},${d[3]},${d[4]},${d[5]},${d[6]},${d[7]},${d[8]}\n`,
          )
          .join('');
        const csvString = `${headerString}${rowString}`;
        const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}.csv`;
        RNFetchBlob.fs
          .writeFile(pathToWrite, csvString, 'utf8')
          .then(() => {
            console.log(`wrote file ${pathToWrite}`);
          })
          .catch(error => console.error(error));
      }
      this.setState({
        textStatus: 'Data Collection finished!! Press Stop to close the App',
        buttonText: 'Stop',
        buttonDisabled: false,
        waitText: '',
        iterationNumber: 0,
      });
      alert(`Go to Downloads/${fileName}.csv to get the csv Data`);
    }, 315000);
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.buttonText}>{this.state.textStatus}</Text>
        <TouchableOpacity
          onPress={this.onPress}
          style={
            this.state.buttonDisabled
              ? styles.disabledButton
              : styles.roundButton1
          }
          disabled={this.state.buttonDisabled}
        >
          <Text style={styles.buttonText}>{this.state.buttonText}</Text>
        </TouchableOpacity>
        <Text style={styles.BottomText} disabled={!this.state.buttonDisabled}>
          {this.state.waitText}
        </Text>

        <Text style={styles.lastText}>
          Iteration Number : 
          {' '}
          {this.state.iterationNumber}
        </Text>
        <KeepAwake />
      </SafeAreaView>
    );
  }
}
