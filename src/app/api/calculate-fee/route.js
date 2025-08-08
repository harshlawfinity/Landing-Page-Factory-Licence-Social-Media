export async function POST(req) {
  const body = await req.json();
  const { state, form } = body;

  const stateConfigs = {
    Uttar_Pradesh: {
      types: ["CTE", "CTO"],
      categories: ["Red", "Orange", "Green"],
      ranges: {
        CTE: { slabs: [9, 50, 100, 1000, 5000, 10000, 50000], fees: [500, 1500, 3000, 10000, 25000, 37000, 50000] },
        CTO: { slabs: [10, 50, 100, 1000, 5000, 10000, 50000], fees: [1000, 3000, 8000, 40000, 100000, 150000, 200000] }
      },
      calculateFee: (form) => {
        const inv = parseFloat(form.investment);
        const slabs = form.type === "CTO" ? stateConfigs.UP.ranges.CTO : stateConfigs.UP.ranges.CTE;
        let index = slabs.slabs.findIndex((s) => inv <= s);
        index = index === -1 ? slabs.fees.length - 1 : index;
        const years = form.type === "CTO" ? parseInt(form.years) || 1 : 1;
        return { fee: slabs.fees[index] * years };
      }
    },
    Haryana: {
      types: ["CTE", "CTO"],
      categories: ["Red", "Orange", "Green"],
      slabs: {
        Red: [105000, 60000, 36000, 24000, 17700, 14500, 7500, 4500, 2250, 600],
        Orange: [35000, 20000, 12000, 8000, 5700, 4500, 2500, 1500, 750, 200],
        Green: [35000, 20000, 12000, 8000, 5700, 4500, 2500, 1500, 750, 200],
      },
      security: {
        Red: [25000, 50000, 100000, 200000, 300000, 400000, 500000],
        Orange: [12500, 25000, 75000, 150000, 200000, 250000, 300000],
        Green: [5000, 10000, 25000, 50000, 100000, 125000, 150000],
      },
      calculateFee: (form) => {
        const inv = parseFloat(form.investment) / 100;
        const cat = form.category;
        const slabIndex = [100, 50, 10, 3, 1, 0.5, 0.25, 0.1, 0.02, 0].findIndex((v) => inv > v);
        const secIndex = [0.5, 1, 5, 10, 50, 100, 1000].findIndex((v) => inv <= v);
        const years = form.type === "CTO" ? parseInt(form.years) || 1 : 1;
        const fee = stateConfigs.Haryana.slabs[cat][slabIndex] * years;
        const security = stateConfigs.Haryana.security[cat][secIndex];
        return { fee, security, total: fee + security };
      },
    },
    Delhi: {
      types: ["CTE", "CTO"],
      categories: ["Green", "Orange"],
      slabs: {
        Green: [100, 200, 400, 1000, 5000, 7500, 12500, 25000, 50000, 100000, 150000, 300000, 500000],
        Orange: [500, 1000, 1000, 2000, 10000, 15000, 25000, 50000, 100000, 300000, 600000, 1000000],
      },
      ctoSlabs: {
        Green: [200, 400, 1000, 2000, 10000, 15000, 25000, 50000, 100000, 300000, 600000, 1000000],
        Orange: [1000, 2000, 3000, 4000, 20000, 30000, 50000, 100000, 200000, 600000, 1200000, 2000000],
      },
      investmentRanges: [5, 10, 25, 50, 100, 200, 500, 1000, 5000, 10000, 50000, 100000],
      calculateFee: (form) => {
        const inv = parseFloat(form.investment);
        const years = form.type === "CTO" ? parseInt(form.years) || 1 : 1;
        const idx = stateConfigs.Delhi.investmentRanges.findIndex((val) => inv <= val);
        const baseFee = form.type === "CTO"
          ? stateConfigs.Delhi.ctoSlabs[form.category][idx]
          : stateConfigs.Delhi.slabs[form.category][idx];
        return { fee: baseFee * years };
      },
    },
  };

  const config = stateConfigs[state];
  if (!config) {
    return Response.json({ message: "Invalid state" }, { status: 400 });
  }

  try {
    const result = config.calculateFee(form);
    return Response.json(result, { status: 200 });
  } catch (e) {
    return Response.json({ message: "Error calculating fee", error: e.message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "✅ API is live" });
}
