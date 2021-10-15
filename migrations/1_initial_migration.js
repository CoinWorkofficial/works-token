const Work = artifacts.require("Work");

module.exports = async function (deployer,network,accounts) {
  console.log(accounts);
  const _name = "Works Token";
  const _symbol = "WORK";
  const supply = '105000000'
  const _total = supply + "000000000000000000";
  const _owner = accounts[0];
  const _community = accounts[1];
  const _liq = accounts[2];
  const _mark = accounts[3];
  const _dev = accounts[4];
  const _presale = accounts[5];
  const _team = accounts[6];
  const _reserve = accounts[7];

  await deployer.deploy(Work,_name,_symbol,_total,_owner,_community,_liq,_mark,_dev,_presale,_team,_reserve);
};
