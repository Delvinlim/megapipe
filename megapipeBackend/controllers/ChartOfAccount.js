import ChartOfAccount from "../models/ChartOfAccountModel.js";

export const getChartOfAccounts = async (req, res) => {
  try {
    const chartOfAccounts = await ChartOfAccount.findAll();
    res.status(200).json(chartOfAccounts);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const getChartOfAccount = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  try {
    const chartOfAccount = await ChartOfAccount.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!chartOfAccount)
      return res.status(404).json({ message: "Chart Of Account not found" });

    res.status(200).json(chartOfAccount);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const createChartOfAccount = async (req, res) => {
  const { code, name, type, amount, coaId } = req.body;
  if (!code || !name || !type || !amount) return res.sendStatus(400);

  try {
    console.log('see here amount')
    console.log(amount)
    const chartOfAccount = await ChartOfAccount.create({
      name: name,
      code: code,
      type: type,
      amount_total: amount,
      akunPerkiraanId: coaId || null,
    });
    res.status(200).json({
      message: "Your chart of account has been created",
      chartOfAccount: chartOfAccount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const updateChartOfAccount = async (req, res) => {
  const { code, name, type, amount, coaId } = req.body;

  if (!req.params.id) return res.sendStatus(400);

  try {
    // const chartOfAccount = await ChartOfAccount.findOne({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    // if (!chartOfAccount) return res.status(404).json({message: "Chart Of Account not found"})

    await ChartOfAccount.update(
      {
        name: name,
        code: code,
        type: type,
        amount_total: amount,
        akunPerkiraanId: coaId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      message: "Your chart of account has been updated",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};

export const deleteChartOfAccount = async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);

  try {
    await ChartOfAccount.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Your chart of account has been deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      details: err,
    });
  }
};
