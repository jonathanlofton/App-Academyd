# Implement a queue with #enqueue and #dequeue, as well as a #max API,
# a method which returns the maximum element still in the queue. This
# is trivial to do by spending O(n) time upon dequeuing.
# Can you do it in O(1) amortized? Maybe use an auxiliary storage structure?

# Use your RingBuffer to achieve optimal shifts! Write any additional
# methods you need.

require_relative 'ring_buffer'

class QueueWithMax
  attr_accessor :store

  def initialize
    @store = RingBuffer.new
    @max = []
  end

  def enqueue(val)
    @store.push(val)

    if @max.length == 0 || @max[@max.length - 1] < val
      @max = [val]
    else
      @max << val
    end
  end

  def dequeue
    if @store[0] == @max[0]
      @max.shift
    end
    @store.shift
  end

  def max
    @max.first
  end

  def length
    @store.length
  end

end
