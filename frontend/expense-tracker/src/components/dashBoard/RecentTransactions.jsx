import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See More
          <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((transaction) => (
          <TransactionInfoCard
            key={transaction.id}
            title={
              transaction.type == "expense"
                ? transaction.category
                : transaction.source
            }
            icon={transaction.icon}
            // date={moment(transaction.date).formate("Do MMM YYYY")}
            amount={transaction.amount}
            type={transaction.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
