import _ from 'lodash';

function upperSnake(varr){
  return _.snakeCase(varr).toUpperCase();
}

const abode = {
  get(envVar){
    return process.env[upperSnake(envVar)];
  },
  set(envVar, variable){
    return process.env[upperSnake(envVar)] = variable;
  },
  default(envVar, defaultVar){
    return abode.exists(envVar) ? abode.get(envVar) : abode.set(envVar, defaultVar);
  },
  exists(envVar){
    return !!abode.get(envVar);
  },
  isEnv(env){
    return _.isEqual(process.env.NODE_ENV, env);
  }
};

export default abode;
