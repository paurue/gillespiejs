function  gillespie(){
  // reactions
  // Poff->Pon,k0
  // Pon->Poff,k1
  // Pon->Pon+m,k2
  // m->0,k3

  var data=[];

  // variables:
  var Pon=0,m=0;
  // parameters:
  var k0=1,k1=10,k2=200,k3=1;
  //propensities:
  var p0=0,p1=0,p2=0,p3=0;
  var t=0;
  while(t<100){
    // compute propensities
    p0=k0*(1-Pon);
    p1=k1*Pon;
    p2=k2*Pon;
    p3=k3*m;
    pt=p0+p1+p2+p3;
    // next reaction time
    var u1 = 1-Math.random();
    var tau = -Math.log(u1)/pt;
    t = t+tau;

    var u2 = 1-Math.random();
    var r = u2*pt;
    console.log(pt,'|',r,'|',p0,p1,p2,p3)
    if(r<p0) {
      Pon=1;
    } else if (r<p0+p1) {
      Pon=0;
    } else if (r<p0+p1+p2) {
      m=m+1;
    } else {
      m=m-1;
    }
    data.push({t:t,conc:m})
  }
  return data
}

data=gillespie();
console.log(data);
