import Link from "next/link";
import { Breadcomb, Button, Header, Layout } from "../../../components";

export default function NotePage() {
  const htmlString =
    "<p><strong>RULES OF RECORDING TRANSACTIONS IN LEDGER ACCOUNTS.&nbsp;</strong><br>Transactions resulting in increases in a particular item are recorded on one side of the account while those resulting in decreases are recorded on the other side as explained below&nbsp;<br><strong>a) Assets</strong>-An increase in an asset is recorded on the debit side (debited) while a decrease is recorded on the credit side (credited)&nbsp;<br><strong>b) Liability</strong>-An increase in a liability is credited while a decrease is debited&nbsp;<br><strong>c) Capital</strong>-An increase in capital credited in the capital account while a decrease is debited&nbsp;<br><strong>d) Expenses</strong>-Expenses are those costs incurred in running the business such electricity, storage, insurance etc. An increase in an expense is debited in the respective expense account while a decrease is credited&nbsp;<br><strong>e) Revenues</strong>-Revenues refer to incomes earned from non-business activities. They may include; discount received, commission received, rent received etc. An increase in revenue is credited in the respective revenue account while a decrease is debited</p><p>NOTE: assets and expenses are recorded the same way while liabilities, capital and revenue are recorded the same way.&nbsp;<br><strong>Summary of the rules</strong>&nbsp;<br>a) An increase in the value of an asset is debited in the respective asset account whereas a decrease in the value of the asset is credited in the respective asset account&nbsp;<br>b) An increase in the value of a liability is credited in the respective liability account whereas a decrease in the value of a liability is debited in the respective liability account&nbsp;<br>c) An increase in the value of capital is credited in the capital account whereas a decrease in the value of capital is debited in the capital account&nbsp;<br>d) An increase in the value of revenue/income is credited in the respective revenue/income account whereas a decrease in the value of revenue/income is debited in the respective revenue/income account&nbsp;<br>e) An increase in the value of expenses is debited in the respective expense account whereas a decrease in the value of expenses is credited in the respective expense account</p><p>NOTE: assets and expenses are recorded the same way while liabilities, capital and revenue are recorded the same way.&nbsp;<br><strong>Summary of the rules</strong>&nbsp;<br>a) An increase in the value of an asset is debited in the respective asset account whereas a decrease in the value of the asset is credited in the respective asset account&nbsp;<br>b) An increase in the value of a liability is credited in the respective liability account whereas a decrease in the value of a liability is debited in the respective liability account&nbsp;<br>c) An increase in the value of capital is credited in the capital account whereas a decrease in the value of capital is debited in the capital account&nbsp;<br>d) An increase in the value of revenue/income is credited in the respective revenue/income account whereas a decrease in the value of revenue/income is debited in the respective revenue/income account&nbsp;<br>e) An increase in the value of expenses is debited in the respective expense account whereas a decrease in the value of expenses is credited in the respective expense account</p>";

  return (
    <Layout>
      <Breadcomb />
      <Header text="Square & square root" />

      <div className="absolute top-10 right-36">
        <Link passHref href="/learn/math/numbers">
          <a>
            <Button name="Take quiz" />
          </a>
        </Link>
      </div>
      <div className="bg-shade-light p-5 rounded-lg flex flex-col max-h-[calc(80vh)] max-w-6xl prose-lg ">
        <div dangerouslySetInnerHTML={{ __html: htmlString }} className="overflow-auto" />
      </div>
    </Layout>
  );
}
