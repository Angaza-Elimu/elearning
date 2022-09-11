import { GreenTick } from "../assets";
import { Breadcomb, Button, Header, Layout } from "../components";

export default function Page47() {
  return (
    <Layout>
      <Breadcomb />

      <div className="mb-5">
        <div>
          <Header text="You can choose our recommendations:" />

          <div className="grid grid-cols-3 max-w-6xl items-center gap-7 flex-wrap mt-5">
            <Button
              name="Rounding off"
              type="SECONDARY"
              className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
            />
            <Button
              name="Square & square root"
              type="SECONDARY"
              className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
            />
          </div>
        </div>

        <div className="mt-16">
          <Header text="Or choose a subtopic you like:" />

          <div className="grid grid-cols-3 max-w-6xl items-center gap-7 flex-wrap mt-5">
            <Button
              name="Sequences"
              type="SECONDARY"
              className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
            />
            <Button
              name="Combined operations"
              type="SECONDARY"
              className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
            />
            <Button
              name="Reading & writting numbers"
              type="SECONDARY"
              className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
            />
            <div className="relative">
              {true && (
                <div className="absolute -top-5 -right-2 h-10 w-10">
                  <GreenTick />
                </div>
              )}
              <Button
                name="Square & square root"
                type="SECONDARY"
                className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light w-full border-alerts-success"
              />
            </div>
            <Button
              name="Subtopic"
              type="SECONDARY"
              className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
            />
            <Button
              name="Subtopic"
              type="SECONDARY"
              className="text-shade-dark hover:bg-primary-700/90 hover:text-shade-light border-primary-700"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
