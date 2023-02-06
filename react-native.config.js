module.exports = {
    project: {
        ios: {}, // grouped into "project"
      android: {}, // grouped into "project"
    },
    assets: ["./src/assets/fonts"], // stays the same
    dependencies: {
      'react-native-vector-icons': {
        platforms: {
          ios: null,
        },
      },
    },
  };