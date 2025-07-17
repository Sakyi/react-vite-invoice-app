export const calculateInvoice = (
  selectedItems,
  feedingChoice,
  discount,
  selectedClass,
  arrears,
  overPaid
) => {
  let tuitionTotal = 0;
  let otherTotal = 0;
  var feedingTotal = 0;

  //Determine feeding rate based on class and type
  const getFeedingRate = (type, studentClass) => {
    const className = studentClass.toLowerCase();

    if (type === "breakfast") {
      if (className.includes("creche")) return 5;
      if (
        className.includes("nursery") ||
        className.includes("grade") ||
        className.includes("kg")
      )
        return 8;
    }

    if (type === "lunch") {
      if (className.includes("creche")) return 10;
      if (className.includes("nursery") || className.includes("kg")) return 15;
      if (className.includes("grade")) return 17;
    }

    if (type === "both") {
      if (className.includes("creche")) return 15;
      if (className.includes("nursery") || className.includes("kg")) return 23;
      if (className.includes("grade")) return 25;
    }

    return 0; // fallback
  };

  // Calculate feeding total
  if (feedingChoice?.type && feedingChoice?.days && selectedClass) {
    const rate = getFeedingRate(feedingChoice.type, selectedClass);
    feedingTotal = feedingChoice.days * rate;
  }
  // Process and update items
  const updatedItems = selectedItems.map((item) => {
    const name = item.name?.toLowerCase();
    const qty = item.qty || 1;
    let amount = Number(item.amount) || 0;

    // Replace feeding amount
    if (name === "monthly feeding" || name === "termly feeding") {
      amount = feedingTotal;
    }

    const lineTotal = amount * qty;

    if (name === "monthly tuition" || name === "termly tuition") {
      tuitionTotal += lineTotal;
    } else if (name !== "monthly feeding" && name !== "termly feeding") {
      otherTotal += lineTotal;
    }

    return {
      ...item,
      amount, // override feeding amounts
      total: lineTotal.toFixed(2),
    };
  });

  let update = updatedItems;

  // Apply discount ONLY to tuition
  const discountMap = {
    "10%": 0.1,
    "50%": 0.5,
  };

  if (discount in discountMap) {
    tuitionTotal *= 1 - discountMap[discount];
  }

  const total = tuitionTotal + otherTotal + feedingTotal + arrears;
  const overAllAmount = total - overPaid;
  return [overAllAmount, update];
};
