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

function reset(){ //엑셀 텍스트를 반복문을 돌려서 2차원 배열로 저장
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
const average = [];
const percentage = [];
const deviation = [];
const dispersion = [];
const sDeviation = [];
console.log(data3);

for(let i in data3){ //이중 포문을 사용한 각 요인별 총합 구하기
    for(let j in data3[i]){
        if(j != 0){
            if(i == 0){
                average[j-1] = 0;
            }
            data3[i][j] = data3[i][j].replace(",", "") * 1;
            average[j-1] += data3[i][j];
        }
    }
}

for(let i in average){ //2차원 배열의 첫번째 배열의 크기로 나눠서 각 요인별 평균 구하기
    average[i] /= data3.length;
}

for(let i in data3){ //(자신의 값/평균)*100 으로 각 요인 마다 오차 백분율 구하기
    for(let j in data3[i]){
        if(j != 0){
            if(j == 1) {
                percentage[i] = [];
            }
            if(percentage.length <= i) console.log("err", percentage.length, " ", i);
            
            percentage[i][j-1] = (data3[i][j] / average[j-1]) * 100 - 100;
        }
    }
}

for(let i in percentage){ //팀 별로 자신의 요인 오차 백분율 - 자기 승리 오차백분율 구하기 <= 승리수와의 편차
    for(let j in percentage[i]){
        if(j != 0){ //승리수는 편차 X
            if(i == 0){
                deviation[j-1] = [];
            }
            deviation[j-1][i] = percentage[i][j] - percentage[i][0];
        }
    }
}

for(let i in deviation){ //구한 편차^2의 합 의 제곱근으로 승리수와의 표준편차 구하기
    for(let j in deviation[i]){
        if(j == 0){
            dispersion[i] = 0;
        }
        dispersion[i] += Math.pow(deviation[i][j], 2);
    }
    dispersion[i] /= deviation[i].length;
    
    
    sDeviation[i] = Math.sqrt(dispersion[i]);
}

console.log(sDeviation.join("  "));
console.log(dispersion.join("  "));
for(let i in deviation){
    console.log(deviation[i].join(" "));
    
}
let ie = "";
for(let i in percentage){
    ie += percentage[i][0] + " ";
}
console.log(ie);




