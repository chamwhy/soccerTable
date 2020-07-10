function getAverage(stat){
    let count = 0;
    for(let i in stat){
        count += stat[i];
    }
    return count;
}

function getDelta(stat, avr){
    return stat - avr;
}

function getPercentage(stat, avr){
    return stat/avr;
}
const data3 = [];

function reset(){
    const data = `Liverpool	29	15	63	10	213	500	772	1	5	20,746	59.4
    Manchester City	21	8	68	14	263	631	809	3	6	22,445	61.7
    Chelsea	18	8	54	9	230	567	763	1	7	20,459	57.5
    Leicester City	17	11	56	11	190	474	684	1	5	17,776	55.1
    Manchester United	15	5	46	10	183	487	575	1	8	17,207	54.4
    Burnley	13	10	31	6	145	328	618	0	2	10,949	43.3
    Southampton	13	4	31	11	176	424	587	2	1	12,951	47.9
    Tottenham Hotspur	13	5	46	6	172	398	568	1	3	16,537	52.2
    Wolverhampton Wanderers	13	8	40	7	171	411	649	1	3	14,407	48.3
    Arsenal	12	5	46	4	211	370	634	1	2	16,679	52.9
    Everton	12	14	39	1	190	425	721	0	1	13,444	48.7
    Sheffield United	12	3	33	1	189	319	758	0	1	13,160	45
    Crystal Palace	11	4	26	5	165	334	522	2	3	13,049	46.2
    Newcastle United	11	7	31	4	132	348	518	2	0	11,332	41.9
    Brighton and Hove Albion	8	8	32	3	152	411	610	2	1	16,315	52.7
    West Ham United	8	4	37	3	162	345	622	1	3	12,978	44.8
    Aston Villa	7	3	32	4	172	400	693	1	1	12,308	46.4
    AFC Bournemouth	7	4	28	4	162	332	535	3	2	13,154	46.5
    Watford	7	2	31	0	154	372	596	0	4	12,682	44.1
    Norwich City	5	1	24	2	154	385	440	0	2	15,824	50.8`;
    const data2 = data.split('\n');
    for(let i in data2){
        data3[i] = data2[i].split("\t");
    }
}

reset();

const avr = [];
const percentage = [];
const percentageAvr = [];

for(let i = 0; i < data3.length; i++){
    for(let j = 1; j < data3[i].length; j++){
        if(i == 0) avr[j-1] = 0;
        
        data3[i][j] = data3[i][j].replace(",", "") *1;
        avr[j-1] += data3[i][j];
    }
}

for(let i in avr){
    avr[i] /= data3.length;
    
}
console.log(data3);
console.log(avr);



for(let i in data3){
    percentage[i] = [];
    for(let j = 1; j < data3[i].length; j++){
        percentage[i][j-1] = (data3[i][j]*1 - avr[j-1])/avr[j-1];
        console.log(data3[i][j]);
        console.log(avr[j-1]);
        
        
        console.log(percentage[i][j-1]);
        
    }
}

for(let i in percentage){
    for(let j in percentage[i]){
        
        if(j == 0){

        }else{
            if(i == 0){
                percentageAvr[j-1] = 0;
            }
            percentageAvr[j-1] += Math.pow(percentage[i][j], 2);
            
            
        }
    }
}
console.log(percentageAvr);

for(let i in percentageAvr){
    percentageAvr[i] /= data3[0].length - 1;
    percentageAvr[i] = Math.sqrt(percentageAvr[i]);
}

const body = document.querySelector("body");

for(let i in percentageAvr){
    let div = document.createElement("p");
    div.innerText = percentageAvr[i];
    body.appendChild(div);
}