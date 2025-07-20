
export const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
        <div className="h-8 w-8 border-4 border-grey-200 border-t-purple-600 animate-spin rounded-full"></div>
    </div>
  )
}

