import { Button, TextField } from '@reactjs-archetype/ui'

export function SettingsPage() {
  return (
    <form className="max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Module settings</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Starter form layout for configuration pages.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          defaultValue="Dashboard"
          label="Module name"
          name="moduleName"
        />
        <TextField
          defaultValue="/dashboard/"
          label="Public base path"
          name="basePath"
        />
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <Button variant="secondary">Cancel</Button>
        <Button type="submit">Save settings</Button>
      </div>
    </form>
  )
}
