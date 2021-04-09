import { renderHook } from "@testing-library/react-hooks";
import { useForm } from "../src";

describe("useForm", () => {
  test("should be defined", () => {
    expect(useForm).toBeDefined();
  });

  test("handleSubmit", async () => {
    const submits: any = {};
    const handleSubmit = async (data: any, dirty: any) => {
      submits.data = data;
      submits.dirty = dirty;
    };
    const { result } = renderHook(() => useForm({ handleSubmit }));
    expect(result.current.data).toEqual({});
    const onSubmit = result.current.onSubmit();

    await onSubmit();

    expect(submits.data).toEqual({});
    expect(submits.dirty).toEqual({});
  });

  test("setValue", async () => {
    const submits: any = {};
    const handleSubmit = async (data: any, dirty: any) => {
      submits.data = data;
      submits.dirty = dirty;
    };
    const { result } = renderHook(() => useForm({ handleSubmit }));
    expect(result.current.data).toEqual({});
    const onSubmit = result.current.onSubmit();

    result.current.setValue("test", "this is a test");

    await onSubmit();

    expect(submits.data).toEqual({ test: "this is a test" });
    expect(submits.dirty).toEqual({ test: "this is a test" });
  });
});
