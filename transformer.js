const upstreamTransformer = require("metro-react-native-babel-transformer");
const MdxTransformer = require("@bacons/mdx/metro-transformer");

module.exports.transform = async (props) => {
  if (props.filename.endsWith(".svg")) {
    return require("react-native-svg-transformer").transform(props);
  }
  // Then pass it to the upstream transformer.
  return upstreamTransformer.transform(
    // Transpile MDX first.
    await MdxTransformer.transform(props)
  );
};
