import React from 'react'
import Input from 'components/input'

export default ({ onHost = (room) => (event) => {}, onCancel }) => {
  const handleHost = (event) => {
    onHost({ name: event.target.name.value })(event)
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-75"
      onClick={onCancel}
    >
      <div
        className="container mx-auto max-w-lg p-4 bg-gray-200 dark:bg-gray-800"
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleHost}>
          <div className="space-y-4">
            <Input
              label="Room Name"
              type="text"
              placeholder="Enter the room name"
              name="name"
              required
            />
          </div>

          <div className="flex flex-row gap-x-4">
            <button
              className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-red-400 hover:bg-red-500 text-white rounded-none mt-8 mb-4"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="w-full px-4 py-2 outline-none focus:outline-none focus:ring bg-green-400 hover:bg-green-500 text-white rounded-none mt-8 mb-4"
              type="submit"
            >
              Host
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
