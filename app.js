var ChainOf = require("chainof"),
    utils = require('./lib/utils'),
    chain = new ChainOf();

//------------------------------------------------//
//begin autogenerated by skawtus
//------------------------------------------------//
var default_payload = {
  device: {
    type: "ee15bcea-c04e-4152-91cf-fd6c90a79538",     //skawtus generated device guid
    account: "8fb01791-b7e6-4f41-abae-2a0cbf473d79",  //skawtus generated account 
    period: 5000                                      //skawtus generated polling period in milliseconds
  }
};

var out_http = require('./lib/out/skawtus_http'),
    out_mqtt = require('./lib/out/skawtus_mqtt'),
    in_wifi = require('./lib/in/wifi_sensor'),
    in_flow = require('./lib/in/flow_sensor'),
    in_temp = require('./lib/in/w1_temp');

function buildChain(){
    chain.clear();
    chain.use(in_wifi.check);
    chain.use(in_flow.check);
    // chain.use(in_temp.check);
    chain.use(out_http.sendGet);
    chain.use(log);
}
//------------------------------------------------//
//end autogenerated content
//------------------------------------------------//

function log(payload, callback){
  console.log( JSON.stringify(payload, null, '  ') );
  callback(payload);
}

function checkState(payload){
  chain.run(payload);
  setTimeout(checkState, payload.device.period, utils.clone(default_payload) );
}


buildChain();
checkState( utils.clone(default_payload) );
